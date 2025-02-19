import { cookies } from "next/headers"


export const getAccessToken = (): string | undefined => {
    const token = cookies().get("authToken")?.value;
    console.log(token)
    return token;
};
