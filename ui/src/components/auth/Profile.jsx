import React from "react";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

import { ConnectedProfileCard } from "./ProfileCard";
import Loading from "../common/Loading";

const Profile = () => {
  const { user } = useAuth0();
  return (
    <section className="padding-large">
      <div className="container">
        <ConnectedProfileCard showFollow={false} username={user?.nickname} />
      </div>
    </section>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <Loading />,
});
