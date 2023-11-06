import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/item";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { title, description, categoryId } = await request.json();
  await connectMongoDB();
  await Item.create({ title, description, categoryId });
  return NextResponse.json({ message: "Item Created", category: categoryId }, { status: 201 });
}

export async function GET() {

  await connectMongoDB();

  const result = await Item.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category',
      },
    }
  ]);
  console.log(result, 'this is ');


  const items = await Item.find();
  return NextResponse.json({ items });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Item.findByIdAndDelete(id);
  return NextResponse.json({ message: "Item deleted" }, { status: 200 });
}
