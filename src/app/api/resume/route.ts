import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const profile = await prisma.profileInfo.findFirst({
      select: { resumeLink: true },
    });

    const resumeUrl = profile?.resumeLink;

    if (!resumeUrl) {
      return NextResponse.json(
        { error: "Resume not available" },
        { status: 404 }
      );
    }

    // Fetch the PDF from Cloudinary
    const response = await fetch(resumeUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch resume" },
        { status: 502 }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    // Serve the file as a downloadable PDF with correct headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Alok_Yadav_Resume.pdf"',
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Resume download error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
