import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Bu satır gidip Firebase'deki o "urunler" listesini çeker
    const querySnapshot = await getDocs(collection(db, "urunler"));
    const data = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Veriler çekilemedi" }, { status: 500 });
  }
}