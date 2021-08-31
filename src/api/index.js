import ajax from "./ajax";
export const login = data => {
    return ajax("/login",data,"post");
}