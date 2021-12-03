import React, { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../../firebase";
import Layout from "../../components/layout";
import styles from "../../components/scss/login.module.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const loginUser = (props: any) => {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result: any) => {
        return result;
      })
      .catch((error: any) => {
        alert(error.message);
      });
    setEmail("");
    setPassword("");
    router.push("/auth/login");
  };

  return (
    <Layout>
      <div className={styles.login}>
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-password-input"
              label="Email"
              type="Email"
              autoComplete="current-email"
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setEmail(e.target.value)}
            />
          </form>
        </div>
        <br />
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="standard-password-input"
              label="Password"
              type="Password"
              autoComplete="current-password"
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setPassword(e.target.value)}
            />
          </form>
        </div>
        <br />
        <p className={styles.createAccount}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            登録する
          </Button>
        </p>
      </div>
    </Layout>
  );
};

export default loginUser;
