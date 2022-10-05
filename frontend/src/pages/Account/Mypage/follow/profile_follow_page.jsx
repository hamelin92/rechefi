import React, { useEffect, useState } from "react";
import ProfileFollowMenu from "./profile_follow_menu";
import ProfileFollowerList from "./profile_follower_list";
import ProfileFollowingList from "./profile_following_list";
import { useLocation } from "react-router-dom";

const ProfileFollowPage = () => {
  const { state } = useLocation();
  const email = state.email;
  const follower = state.follower;
  const following = state.following;
  const [isFollower, setIsFollower] = useState();

  useEffect(() => {
    setIsFollower(state.isFollower);
  }, [state.isFollower]);

  return (
    <>
      <ProfileFollowMenu
        follower={follower}
        following={following}
        email={email}
      />
      {isFollower ? (
        <ProfileFollowerList email={email} />
      ) : (
        <ProfileFollowingList email={email} />
      )}
      <></>
    </>
  );
};

export default ProfileFollowPage;
