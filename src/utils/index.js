import userMessage from "./userMessage";
import storageUtils from "./storageUtils";

const user = storageUtils.getUser();
if(user && user._id){
    userMessage.user = user;
}