/*
  로그인 페이지
  url : /login
*/

import { useState } from "react";
import { Input, Button, Form } from "antd";
import Wrapper from "shared/components/blocks/Wrapper";
import { useMessageContext } from "app/providers/message";
import { useNavigate } from "react-router-dom";
import type { Auth } from "shared/types/dto/auth";

export default function Login(){
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi] = useMessageContext();
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/login/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          userid: id,
          passwd: password,
        }),
      });

      if(!response.ok) {
        messageApi.open({type : "error", content : `로그인 실패`, duration : 3});
        return;
      }

      const data : Auth = await response.json();
      if(!data.accessToken) {
        messageApi.open({type : "error", content : "로그인 실패: 토큰을 받지 못했습니다.", duration : 2});
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      messageApi.open({type : "success", content : "로그인 성공", duration : 2});
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      messageApi.open({type : "error", content : `로그인 오류: ${error instanceof Error ? error.message : "알 수 없는 오류"}`, duration : 3});
    }
  };

  return(
    <Wrapper>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
        <h1>로그인</h1>
        <Form onSubmitCapture={handleSubmit}>
          <Form.Item label="아이디">
            <Input
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="아이디를 입력하세요"
            />
          </Form.Item>
          <Form.Item label="비밀번호">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  )
}

