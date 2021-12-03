import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/PageStates";
import GridComponent from "../components/pageView/gridComponent";
import Layout from "../components/layout";
import styles from "../components/scss/layout.module.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const IndexPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { users }: any = useContext(AppContext);

  useEffect(() => {
    if (!users.uid) setOpen(true);
  }, []);

  return (
    <Layout>
      <div>
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
              bgcolor: "background.paper",
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
      <GridComponent />
      <div className={styles.authMessage}>
        <h1>開発者の想い</h1>
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
