import Header from "@/components/Header";
import ImageUploader from "@/components/ImageUploader";

export default function ImageUploaderPage() {
  return (
    <main className="flex min-h-screen flex-col items-center ">
      <Header />
      <ImageUploader />
    </main>
  );
}
