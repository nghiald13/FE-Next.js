import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

const Dashboard = () => {

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center ">
        <Link href="/dashboard/user" passHref className="w-full max-w-3xs block no-underline cursor-pointer">
          <Card className="
          mx-auto w-full pt-0 overflow-hidden justify-center shadow-2xl
          hover:scale-[1.05] transition-transform duration-300
        "
          >
            <AspectRatio ratio={16 / 9} className="bg-muted">
              <img className="w-full h-full object-contain" src="https://static.thenounproject.com/png/3962923-200.png" alt="User Management" />
            </AspectRatio>
            <CardHeader>
              <CardTitle className="text-center">Users Management</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div >
    </>

  );
}

export default Dashboard;


