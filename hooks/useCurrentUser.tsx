import React, { useContext } from "react";
import { auth, userDB } from "../firebase";
import { AppContext } from "../context/PageStates";

// 現在ログインしてるユーザーの情報をstateに挿入
const useCurrentUser = () => {
  // async () => {
  const {
    router,
    users,
    setUsers,
    setLoginedId,
    setAuthUserId,
  }: any = useContext(AppContext);
  const authUser = auth.currentUser;
  if (authUser) {
    const authUid = authUser.uid;
    userDB
      .get()
      .then((querySnapshot) => {
        let userIds = [];
        querySnapshot.forEach((doc) => {
          const restData = { ...doc.data() };
          userIds.push({
            id: doc.id,
            avatar: restData.avatar,
            letterName: restData.letterName,
            otherInfo: restData.otherInfo,
            uid: restData.uid,
          });
          const loginIdNumber: number = userIds.findIndex(
            (userId) => userId.uid === authUid
          );
          loginIdNumber !== -1
            ? setLoginedId(userIds[loginIdNumber].id)
            : setUsers({
                id: users.id,
                avatar: users.avatar,
                letterName: users.letterName,
                otherInfo: users.otherInfo,
                uid: authUid,
              });
          setAuthUserId(authUid);
        });
      })
      .catch((error: any) => {
        alert(error.message);
      });
    router.push("/");
  } else {
    alert("ログインユーザーが見つかりません");
  }
};
// };

export default useCurrentUser;
