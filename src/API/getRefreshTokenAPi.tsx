import axios from "axios";
import BASE_URL from "../BASE_URL";

export const getRefreshTokenAPi = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
        console.error("No refresh token found in localStorage");
        return;
    }

    try {
        const response = await axios.post(
            `${BASE_URL}token/refresh/`,
            { refresh: refreshToken },
            { headers: { "Content-Type": "application/json" } }
        );

        const { access } = response.data;

        localStorage.removeItem('access_token');
        if (access) {
            localStorage.setItem('access_token', access);
        }
    } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem('access_token');
    }
};
