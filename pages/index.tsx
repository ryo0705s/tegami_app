import React, { useState, useEffect, useContext } from "react";
import Layout from "../components/layout";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import styles from "../components/layout.module.scss";
import { AppContext } from "../components/PageStates";

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
              width: 1,
              height: 1,
              bgcolor: "background.paper",
              // background-image: url(/background.jpg),
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <img
              src="tegamiLogo.png"
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
      <h2>サイトについて</h2>
      {/* <Image src="/letter.jpg" width={300} height={400} /> */}
      <p>
        このサイトは”手紙を通じて心の安らぎを感じてほしい”そんな思いから生まれました。
        <br />
        コロナにより人々の生活は大きく変わりました。
        <br />
        日々不安や悩みを感じる事が多くなったように思います。
        <br />
        そんな人たちの力になれたら嬉しいです。
        <br />
      </p>
    </Layout>
  );
};

export default IndexPage;
