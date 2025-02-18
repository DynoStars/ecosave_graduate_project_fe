// utils/navigation.ts
import { useRouter } from "next/navigation"; // Import useRouter

const NavigateTo = (url: string) => {
    const router = useRouter();
    router.push(url); // Điều hướng đến URL mới
};

export default NavigateTo;
