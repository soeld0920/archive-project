import { api } from "axios/api";
import { useEffect, useRef, useState } from "react";
import InputImage from "shared/components/blocks/InputComponets/InputImage";
import InputText from "shared/components/blocks/InputComponets/InputText";
import SubmitButton from "shared/components/blocks/InputComponets/SubmitButton";
import type { UserRes } from "shared/types/dto/user";
import styles from "../style/BlogManage.module.css";
import Textares from "shared/components/blocks/InputComponets/Textares";

export default function UserInfoManage(){
  const userInfo = useRef<UserRes | null>(null);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [banner, setBanner] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      await api.get("/user/me")
      .then((res) => {
        userInfo.current = res.data;
        setNickname(res.data.userName);
        setEmail(res.data.email);
        setBio(res.data.bio);
      })
    }
    fetchUserInfo();
  }, []);

  return(
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <h2 className={styles.title}>닉네임 변경</h2>
          <div className={styles.inputWrapper}>
            <InputText value={nickname} setValue={setNickname} placeholder="닉네임을 입력하세요" />
          </div>
          <div className={styles.buttonWrapper}>
            <SubmitButton label="닉네임 변경" onClick={() => {}} />
          </div>
        </li>
        <li className={styles.listItem}>
          <h2 className={styles.title}>이메일 변경</h2>
          <div className={styles.inputWrapper}>
            <InputText value={email} setValue={setEmail} placeholder="이메일을 입력하세요" />
          </div>
          <div className={styles.buttonWrapper}>
            <SubmitButton label="이메일 변경" onClick={() => {}} />
          </div>
        </li>
        <li className={styles.listItem}>
          <h2 className={styles.title}>소개글 변경</h2>
          <div className={styles.inputWrapper}>
            <Textares value={bio} setValue={setBio} placeholder="소개글을 입력하세요" width="100%" height="200px" />
          </div>
          <div className={styles.buttonWrapper}>
            <SubmitButton label="소개글 변경" onClick={() => {}} />
          </div>
        </li>
        <li className={styles.listItem}>
          <h2 className={styles.title}>배너 이미지 변경</h2>
          <div className={styles.bannerSection}>
            <div className={styles.imageInputWrapper}>
              <InputImage setImage={setBanner} width="100px" height="100px" />
            </div>
            {banner && <img src={banner} alt="banner" className={styles.imagePreview} />}
          </div>
          <div className={styles.buttonWrapper}>
            <SubmitButton label="배너 이미지 변경" onClick={() => {}} />
          </div>
        </li>
      </ul>
  )
}