import React, { useContext, useEffect } from "react";
import { userDB } from "../../firebase";
import Layout from "../../components/layout";
import { AppContext } from "../../context/PageStates";
import { makeStyles } from "@material-ui/core/styles";
import LoginComponent from "../../components/view/loginComponent";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const login = () => {
  const classes = useStyles();

  const { loginedId, users, setUsers, router }: any = useContext(AppContext);

  useEffect(() => {
    if (loginedId)
      (async () => {
        const docRef = await userDB.doc(loginedId);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUsers({
                id: doc.id,
                avatar: doc.data().avatar,
                letterName: doc.data().letterName,
                otherInfo: doc.data().otherInfo,
                uid: doc.data().uid,
              });
              router.push("/");
            } else {
              alert("対象のドキュメントが見つかりません");
            }
          })
          .catch((error: any) => {
            alert(error.message);
          });
      })();
  }, [loginedId]);

  useEffect(() => {
    console.log(users, "いる？");
  }, [users]);

  return (
    <Layout>
      <LoginComponent />
    </Layout>
  );
};

export default login;
