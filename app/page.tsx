"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { InstagramEmbed } from "react-social-media-embed";
import axios from "axios";
import { use, useEffect, useState } from "react";

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
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
  phone: z.string().min(10).max(15),
  resume: z.any(),
  itLetter: z.any(),
});

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      resume: null,
      itLetter: null,
    },
  });

  if (isLoading === true) {
    toast.loading("Uploading", {
      id: "loading",
    });
  } else {
    toast.remove("loading");
  }

  console.log(isLoading);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const data = form.getValues();

    const formData = new FormData();

    if (data.resume == null) {
      toast.error("Please Upload a Resume");
    } else if (data.itLetter == null) {
      toast.error("Please Upload a Internship Letter");
    } else {
      formData.append("resume", data.resume[0]);
      formData.append("itLetter", data.itLetter[0]);
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phone", data.phone);

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
          console.log(err.response.data);
          toast.error(err.response.data || "An error occured");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return (
    <Form {...form}>
      <Dialog>
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
                  <Input placeholder="John Doe" {...field} />
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
                  <Input placeholder="johndoe@nuesaabuad.com" {...field} />
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
                  <Input placeholder="+234 7057395799" {...field} />
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

            <DialogTrigger>
              <Button type="button" variant={"outline"}>
                Show Tip
              </Button>
            </DialogTrigger>
          </div>
        </form>
        <DialogContent>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <InstagramEmbed
              url="https://www.instagram.com/reel/CthLRw3NlNR/?igshid=MzRlODBiNWFlZA=="
              width={328}
            />
          </div>
        </DialogContent>
      </Dialog>
    </Form>
  );
}
