/*
  로그인 유저를 저장하는 redux store 관리 페이지지
*/

import type { User } from "shared/types/User";

// 액션 타입 선언
const SET_LOGIN_USER = "login/SET_LOGIN_USER";
const SET_LOGOUT = "login/SET_LOGOUT";

type Action = {
  type : typeof SET_LOGIN_USER;
  payload : User;
} | {
  type : typeof SET_LOGOUT;
};

// 액션 생성 함수 선언
export const setLoginUser = (user : User) => ({
  type : SET_LOGIN_USER,
  payload : user,
});

export const setLogout = () => ({
  type : SET_LOGOUT,
});

// 초기 상태 선언
const initialState : User | null = null;

// 리듀서 선언
function loginReducer(state : User | null = initialState , action : Action) : User | null{
  switch(action.type){
    case SET_LOGIN_USER:
      return action.payload;
    case SET_LOGOUT:
      return null;
    default:
      return state;
  }
}

export default loginReducer;