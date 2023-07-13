"use client";

import {
  Container,
  Text,
  Input,
  Spacer,
  Button,
  Grid,
  Dropdown,
  Loading,
} from "@nextui-org/react";
import Gmail from "../../public/gmail.svg";
import Instagram from "../../public/instagram.svg";
import YouTube from "../../public/youtube.svg";

import Banner from "../../components/banner";
import Form from "../../components/form";
import Footer from "../../components/footer";

export default function Home() {
  return (
    <div>
      <Banner />
      <Form />
      <Footer />
    </div>
  );
}
