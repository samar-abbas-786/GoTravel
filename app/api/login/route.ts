import User from "@/models/userSchem";
import db from "@/utils/databse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (request: Request) => {
  await db();
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json({ message: "missing fields" }, { status: 400 });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json(
      { message: "user doesn't exist" },
      { status: 400 }
    );
  }
  const isPassword = await bcrypt.compare(password, user.password);
  if (isPassword === true) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY!, {
      expiresIn: "7d",
    });
    (await cookies()).set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return NextResponse.json(
      { message: "User login successfully", user },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Password Incorrect" },
      { status: 400 }
    );
  }
};
