import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Signin from "./components/signin";
import Signup from "./components/signup";

const Auth = () => {
  return (
    <div className="flex items-center justify-center h-[100vh]">
      <Card>
        <CardContent className=" p-0 border-gray-300 shadow-xl">
          <Tabs
            defaultValue="signin"
            className="w-full flex  flex-col justify-center"
          >
            <TabsList>
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <div className="px-6 py-4">
              <TabsContent value="signin">
                <Signin />
              </TabsContent>
              <TabsContent value="signup">
                <Signup />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
