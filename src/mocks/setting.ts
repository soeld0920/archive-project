//설정 변경용 임시 페이지

import type { User } from "shared/types/User";
import { userList } from "./database/user";

//로그인 여부 변경
const isLogin = true;
//로그인 유저 변경
export const loginUser : User | null = isLogin ? userList[0] : null;