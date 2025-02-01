import ReactPlayer from "react-player";
// import { next, useCurrentLesson } from "../store/slices/player";
// import { useAppDispatch, useAppSelector } from "../store";
import { Loader } from "lucide-react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Video() {
  // const dispatch = useAppDispatch();

  // const { currentLesson } = useCurrentLesson();
  // const isCourseLoading = useAppSelector((state) => state.player.isLoading);

  // function handlePlayNext() {
  //   dispatch(next());
  // }

  const isLoading = useStore((store) => store.isLoading);
  const next = useStore((store) => store.next);

  const { currentLesson } = useCurrentLesson();

  function handlePlayNext() {
    next();
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      {isLoading ? (
        <div className="flex h-full items-center justify-center">
          <Loader className="w-6 h-6 text-zinc-400 animate-spin" />
        </div>
      ) : (
        <ReactPlayer
          width={"100%"}
          height={"100%"}
          controls
          playing
          url={`https://www.youtube.com/watch?v=${currentLesson?.id}`}
          // onEnded={handlePlayNext}
          onEnded={handlePlayNext}
        />
      )}
    </div>
  );
}
