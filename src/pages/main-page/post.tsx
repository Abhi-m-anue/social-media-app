import React, { useEffect, useState } from "react";
import { post } from "./main-page";
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props {
  singlePost: post;
}
interface Like {
  userId: string;
  likeId: string;
}
const Post = ({ singlePost }: Props) => {
  const [user] = useAuthState(auth);
  const [likes, setlikes] = useState<Like[] | null>(null);
  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", singlePost.id));

  const addLike = async () => {
    try {
     const newDoc= await addDoc(likesRef, {
        userId: user?.uid,
        postId: singlePost.id,
      });
      if (user) {
        setlikes((prev) =>
          prev ? [...prev, { userId: user.uid ,likeId: newDoc.id}] : [{ userId: user.uid,likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
        const likeToDeleteQuery= query(likesRef,where("postId","==",singlePost.id),where("userId","==",user?.uid));
        const likeToDeleteData= await getDocs(likeToDeleteQuery)
        const likeToDeleteId= doc(db,"likes",likeToDeleteData.docs[0].id)
      await deleteDoc(likeToDeleteId);
              setlikes((prev) =>
          prev && prev.filter((like)=>like.likeId!==likeToDeleteData.docs[0].id)
        );
      
    } catch (err) {
      console.log(err);
    }
  };

  const getLikes = async () => {
    const data = await getDocs(likesDoc); //likesDoc is the format of document we want from database
    setlikes(data.docs.map((doc) => ({ userId: doc.data().userId ,likeId: doc.id})) as Like[]);
  };
  const hasUserLiked = likes?.find((like) => 
    like.userId === user?.uid
  );

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div>
      <div className="title">
        <h1>{singlePost.title}</h1>
      </div>
      <div className="body">
        <p>{singlePost.description}</p>
      </div>
      <div className="footer">
        <p>@{singlePost.username}</p>
        <button onClick={ hasUserLiked? removeLike : addLike}> {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
        {likes && <p>Likes: {likes.length}</p>}
      </div>
    </div>
  );
};

export default Post;
