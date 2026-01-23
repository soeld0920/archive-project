import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "axios/api";
import styles from "features/Search/Search.module.css";

type UserInfo = {
  name: string;
  description?: string;
  profileImage?: string;
}

export default function BlogSidebar(){
  const {uuid} = useParams<{uuid: string}>();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    if (!uuid) return;
    
    const fetchUserInfo = async () => {
      try {
        const response = await api.get(`/user/${uuid}`);
        setUserInfo({
          name: response.data.name || response.data.userName || "유저 이름 없음",
          description: response.data.description || response.data.bio,
          profileImage: response.data.profileImage
        });
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
    };

    fetchUserInfo();
  }, [uuid]);

  if (!uuid) return null;

  return(
    <aside style={{width : "370px", height : "100%"}}>
      <div className={styles.filterPanel} style={{padding: "10px"}}>
        <h3 style={{margin: 0, marginBottom: "10px"}}>유저 정보</h3>
        {userInfo?.profileImage && (
          <div style={{marginBottom: "10px"}}>
            <img 
              src={userInfo.profileImage} 
              alt={`${userInfo.name} 프로필`}
              style={{width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover"}}
            />
          </div>
        )}
        <h4 style={{margin: 0, marginBottom: "10px"}}>{userInfo?.name || "로딩 중..."}</h4>
        {userInfo?.description && (
          <p style={{margin: 0, whiteSpace: "pre-wrap"}}>{userInfo.description}</p>
        )}
      </div>
    </aside>
  )
}
