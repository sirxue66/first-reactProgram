import ajax from "./ajax";
export const login = (username,password) => {
    return ajax("/login",{username,password},"post");
}