/*
  회원가입 페이지
  url : /signin
*/

import { useState } from "react";
import { Input, Button, Form } from "antd";
import Wrapper from "shared/components/blocks/Wrapper";
import InputImage from "shared/components/blocks/InputComponets/InputImage";
import { api } from "axois/api";
import { useMessageContext } from "app/providers/message";
import { useNavigate } from "react-router-dom";
import { normalizeImageUrl } from "shared/lib/utils/normalizeImageUrl";

export default function Signin(){
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [messageApi] = useMessageContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if(!id || !password || !name || !email){
      messageApi.open({type : "error", content : "모든 필수 정보를 입력해주세요", duration : 2});
      return;
    }

    console.log(normalizeImageUrl(profileImage ?? ""));

    const res = await api.post("/login/signup", {
      userid : id,
      passwd : password,
      name,
      bio,
      banner: normalizeImageUrl(profileImage ?? ""),
      email,
    }).then((res) => {
      messageApi.open({type : "success", content : "회원가입 성공", duration : 2});
      navigate("/login");
    }).catch((error) => {
      messageApi.open({type : "error", content : "회원가입 실패", duration : 2});
    });
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
          <InputImage setImage={setProfileImage} width="100px" height="100px" />
          <img src={profileImage ?? undefined} alt="profile" />
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

