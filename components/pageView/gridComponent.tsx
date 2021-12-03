import React from "react";
import Image from "next/image";
import styles from "../../components/scss/layout.module.scss";
import Grid from "@mui/material/Grid";

const GridComponent = () => {
  return (
    <>
      <Grid container spacing={12}>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p>TEGAMIは手紙を共有できるアプリです</p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemLeft}>
          <p className={styles.photo}>
            <Image
              src="/tegamiShere.jpg"
              alt="手紙を渡す"
              width={300}
              height={250}
            />
          </p>
        </Grid>
        <Grid item xs={6} className={styles.gridItemRight}>
          <p className={styles.photo}>
            <Image
              src="/tegamiMemory.jpg"
              alt="大事に手紙を保管"
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
              alt="タンポポと気持ち"
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
              alt="アカウントを作成する"
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
    </>
  );
};

export default GridComponent;
