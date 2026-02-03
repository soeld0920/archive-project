import axios from "axios";
import { useNavigate } from "react-router-dom";

export const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  // refresh 요청은 Authorization 헤더를 추가하지 않음 (refreshToken은 쿠키에 있음)
  if(config.url?.includes("/login/refresh")) {
    return config;
  }
  
  // FormData를 사용하는 경우 Content-Type을 자동으로 설정하도록 기본 헤더 제거
  if(config.data instanceof FormData) {
    delete config.headers["Content-Type"];
  }
  
  const token = localStorage.getItem("accessToken");
  if(token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use((res) =>  res,
  async (error) => {
    const originalRequest = error.config;
    //console.log(error.response?.data);
    
    // refresh 요청 자체가 실패한 경우 재시도하지 않음
    if(originalRequest.url?.includes("/login/refresh")){
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      alert("로그인 정보가 만료되었습니다. 다시 로그인해주세요.");
      // react-router의 useNavigate 훅을 사용할 수 없으므로, window.location을 사용하여 로그인 페이지로 이동
      window.location.href = "/login";
      return Promise.reject(error);
    }
    
    // 이미 재시도한 요청이면 그냥 에러 반환 (무한 루프 방지)
    if(originalRequest._retry) {
      return Promise.reject(error);
    }
    
    // 토큰 만료 에러 확인
    // 401, 500 에러 또는 ACCESS_TOKEN_EXPIRED 메시지 확인
    // 토큰이 있는 경우에만 refresh 시도 (토큰이 없으면 일반 에러)
    const hasToken = !!localStorage.getItem("accessToken");
    const errorStatus = error.response?.status;
    const errorMessage = error.response?.data?.error;
    
    const isTokenExpired = hasToken && (
      errorStatus === 401 || 
      errorStatus === 500 ||
      errorMessage === "ACCESS_TOKEN_EXPIRED"
    );
    
    if(isTokenExpired) {
      originalRequest._retry = true;
      
      try {
        // refresh 요청은 Authorization 헤더 없이 전송 (refreshToken은 쿠키에 있음)
        const refreshResponse = await api.post("/login/refresh");
        const newToken = refreshResponse.data.accessToken;
        
        // 새 토큰을 localStorage에 저장
        if(newToken) {
          localStorage.setItem("accessToken", newToken);
        }
        
        // 원래 요청에 새 토큰 적용
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api.request(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시 토큰 제거하고 원래 에러 반환
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        // refresh 실패는 원래 에러와는 별개이므로 원래 에러를 반환
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);