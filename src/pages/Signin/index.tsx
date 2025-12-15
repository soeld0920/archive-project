/*
  회원가입 페이지
  url : /signin
*/

import { useState } from "react";
import { Input, Button, Form } from "antd";
import Wrapper from "shared/components/blocks/Wrapper";

export default function Signin(){
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 회원가입 API 호출
    console.log("Signin:", { id, password, name, bio, profileImage, email });
  };

  return(
    <Wrapper>
      <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
        <h1>회원가입</h1>
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
          <Form.Item label="이름">
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </Form.Item>
          <Form.Item label="설명글">
            <Input.TextArea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="자기소개를 입력하세요"
              rows={4}
            />
          </Form.Item>
          <Form.Item label="프로필 사진">
            <Input
              type="text"
              value={profileImage}
              onChange={(e) => setProfileImage(e.target.value)}
              placeholder="프로필 사진 URL을 입력하세요"
            />
          </Form.Item>
          <Form.Item label="이메일">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              회원가입
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  )
}

