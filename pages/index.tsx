import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import styles from "../components/layout.module.scss";
import { AppContext } from "../components/states/PageStates";
import Image from "next/image";

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { users, setUsers }: any = useContext(AppContext);

  useEffect(() => {
    if (!users.uid) setOpen(true);
  }, []);
  return (
    <Layout>
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClick={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            className={styles.box}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              // width: 1,
              // height: 1,
              bgcolor: "background.paper",
              // background-image: url(/background.jpg),
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <img
              src="/tegamiLogo.png"
              alt="tegami"
              className={styles.titleLogo}
            />
            {/* <Typography id="modal-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography> */}
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <div className={styles.topMessage}>
                <p>このサイトは”手紙を通じて心の安らぎを感じてほしい”</p>
                <p>そんな思いから生まれました。</p>
                <p>コロナにより人々の生活は大きく変わりました</p>
                <p>日々不安や悩みを感じる事が多くなったように思います</p>
                <p>そんな人たちの力になれたら嬉しいです。</p>
              </div>
            </Typography>
          </Box>
        </Modal>
      </div>
      <div className={styles.what}>TEGAMIとは</div>
      <Grid container spacing={12}>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p>TEGAMIは手紙を共有できるアプリです</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p className={styles.photo}>
            <Image
              src="/tegamiShere.jpg"
              alt="登録方法"
              width={300}
              height={250}
            />
          </p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p className={styles.photo}>
            <Image
              src="/tegamiMemory.jpg"
              alt="登録方法"
              width={300}
              height={250}
            />
          </p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p>大切にしまってある手紙やメッセージを</p>
          <p>共有してみませんか？</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p>その時感じた気持ちを共有してみましょう♪</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p className={styles.photo}>
            <Image
              src="/shereYourFeeling.jpg"
              alt="登録方法"
              width={300}
              height={200}
            />
          </p>
        </Grid>
      </Grid>
      <div className={styles.how}>TEGAMIの利用方法</div>
      <br />
      <Grid container spacing={12}>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p>アカウントを作成しましょう</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p className={styles.letter}>
            <Image
              src="/createAccount.png"
              alt="登録方法"
              width={250}
              height={300}
            />
          </p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p className={styles.letter}>
            <Image
              src="/uploadLetter.png"
              alt="投稿方法"
              width={250}
              height={300}
            />
          </p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p>撮影した写真やメッセージを投稿してみましょう</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p>気になった投稿にコメントしてみましょう</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p className={styles.letter}>
            <Image
              src="/commentForPost.png"
              alt="コメント方法"
              width={250}
              height={300}
            />
          </p>
        </Grid>
      </Grid>
      <div className={styles.authMessage}>
        <h1>製作者から一言</h1>
        <br />
        <p>コロナによりオンラインでのやりとりが増えました。</p>
        <p>だからこそオフラインの価値が高まっていると思います。</p>
        <p>
          手紙は、”自宅にいながらオフラインの気持ちを相手に渡せる”便利なツールです。
        </p>
        <p>
          このTEGAMIをきっかけに大事な人に手紙を出してみてはどうでしょうか？
        </p>
      </div>
      <div className={styles.instagram}>
        <h2>Instagramはこちら</h2>
        <a href="https://www.instagram.com/tegami_letter/" target="_blank">
          <img src="/instagramLogo.png" alt="instagram" />
        </a>
      </div>
    </Layout>
  );
};

export default IndexPage;
