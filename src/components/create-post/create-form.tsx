import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const CreateForm = () => {
  interface CreateFormData {
    title: string;
    description: string;
  }

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  const schema = yup.object().shape({
    title: yup.string().required("You must add a title"),
    description: yup.string().required("The description cannot be empty"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  });
  
  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postRef, {
      title: data.title,
      description: data.description,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };
  const postRef = collection(db, "post");
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="Title" {...register("title")}></input>
      <p style={{ color: "white" }}>{errors.title?.message}</p>
      <textarea
        placeholder="Description"
        {...register("description")}
      ></textarea>
      <p style={{ color: "white" }}>{errors.description?.message}</p>
      <input className="submit" type="submit"></input>
    </form>
  );
};

export default CreateForm;
