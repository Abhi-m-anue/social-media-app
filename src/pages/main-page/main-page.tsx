import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import Post from "./post";
export interface post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}
const Main = () => {
  const [postList, setPostList] = useState<post[] | null>(null);
  const postRef = collection(db, "post");

  const getPosts = async () => {
    const data = await getDocs(postRef);
        setPostList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as post[]
    );
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
      <div>
        {postList?.map((post) => (
          <Post singlePost={post}></Post>
        ))}
      </div>
  );
};

export default Main;
