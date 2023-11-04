import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description } = await request.json();
  await connectMongoDB();
  await Item.create({ title, description });
  return NextResponse.json({ message: "Item Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const item = await Item.find();
  console.log(item, 'item');
  return NextResponse.json({ item });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Item.findByIdAndDelete(id);
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
