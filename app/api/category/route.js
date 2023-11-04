import connectMongoDB from "@/libs/mongodb";
import Category from "@/models/category";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Category.create({ title, description });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const category = await Category.find();
  return NextResponse.json({ category });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}
