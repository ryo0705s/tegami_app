import React, { useContext } from "react";
import { useLoginAction } from "../../hooks/useLoginAction";
import Link from "next/link";
import styles from "../../components/scss/login.module.scss";
import { AppContext } from "../../context/PageStates";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

const LoginComponent = () => {
  const classes = useStyles();

  const {
    handleLogin,
    googleLogin,
    anonymousLogin,
    forgotLoginInfo,
  } = useLoginAction();

  const {
    setEmail,
    setPassword,
    logined,
    setLogined,
    forgotEmail,
    setForgotEmail,
  }: any = useContext(AppContext);

  return (
    <div className={styles.login}>
      <div>
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="standard-password-input"
            label="Email"
            type="Email"
            autoComplete="current-email"
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
        </form>
      </div>
      <br />
      <p className={styles.loginButton}>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          ログイン
        </Button>
      </p>
      <br />
      <div className={styles.otherLogin}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={googleLogin}
        >
          Googleログイン
        </Button>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={anonymousLogin}
        >
          ゲストログイン
        </Button>
      </div>
      <br />
      <div className={styles.forLogin}>
        <p onClick={() => setLogined(!logined)}>パスワードを忘れた</p>
        {logined ? (
          <>
            <span>メール</span>
            <TextField
              type="email"
              onChange={(e) => setForgotEmail(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              value={forgotEmail}
              onClick={forgotLoginInfo}
            >
              送信
            </Button>
          </>
        ) : (
          ""
        )}
        <br />
        <p>
          <Link href="/auth/loginUser">アカウントを作成する</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
