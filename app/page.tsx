"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InstagramEmbed } from "react-social-media-embed";
import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

import Logo from "@/assets/NUESA LOGO.png";
import Link from "next/link";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  resume: z.custom<File[]>().refine((files) => {
    return files.length > 0;
  }, "Please Upload a Resume"),
  itLetter: z.custom<File[]>().refine((files) => {
    return files.length > 0;
  }, "Please Upload a Internship Letter"),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resume: undefined,
      itLetter: undefined,
    },
  });

  if (isLoading === true) {
    toast.loading("Uploading", {
      id: "loading",
    });
  } else {
    toast.remove("loading");
  }

  function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();

    if (values.resume == undefined) {
      toast.error("Please Upload a Resume");
    } else if (values.itLetter == undefined) {
      toast.error("Please Upload a Internship Letter");
    } else if (values.resume[0].size > 5000000) {
      toast.error("Please your Resume should not be more than 5mb");
    } else if (values.itLetter[0].size > 5000000) {
      toast.error("Please your Internship Letter should not be more than 5mb");
    } else {
      formData.append("resume", values.resume[0]);
      formData.append("itLetter", values.itLetter[0]);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);

      setIsLoading(true);

      axios
        .post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          toast.success("Your Resume has been submitted successfully");
          form.reset();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response);

          toast.error(err.response.data || "An error occured");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <>
      <div className="space-y-8 ">
        <Link href="/">
          <Image
            alt="logo"
            src={Logo}
            width={70}
            height={70}
            placeholder="blur"
            className="mx-auto"
          />
          <h1 className="text-center text-2xl font-bold">
            NUESA ABUAD RESUME UPLOAD
          </h1>
        </Link>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 p-2 max-w-lg mx-auto "
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>
                  Your Full Name as it appears on your certificate
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@nuesaabuad.com"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>Your active email address</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+234 7057395799"
                    {...field}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormDescription>Your active phone number</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume/CV</FormLabel>

                <Input
                  disabled={isLoading}
                  type="file"
                  accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  {...form.register("resume")}
                />

                <FormDescription>
                  Your most recent Resume/CV (PDF)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="itLetter"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industrial Attachment Letter</FormLabel>

                <Input
                  type="file"
                  accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  {...form.register("itLetter")}
                  disabled={isLoading}
                />

                <FormDescription>
                  Your most stamped IT Letter from the School (PDF)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-1">
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
            <Dialog>
              <DialogContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <InstagramEmbed
                    url="https://www.instagram.com/reel/CthLRw3NlNR/?igshid=MzRlODBiNWFlZA=="
                    width={328}
                  />
                </div>
              </DialogContent>
              <DialogTrigger type="button">Show Tip</DialogTrigger>
            </Dialog>
          </div>
        </form>
      </Form>
    </>
  );
}
