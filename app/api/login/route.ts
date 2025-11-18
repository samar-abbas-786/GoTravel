import User from "@/models/userSchem";
import db from "@/utils/databse";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

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
    return NextResponse.json(
      { message: "Password Correct", isPassword },
      { status: 200 }
    );
  } else {
    return NextResponse.json(
      { message: "Password Incorrect" },
      { status: 400 }
    );
  }
};
