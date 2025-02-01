import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { MessageCircle } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "../store";
// import { loadCourse, useCurrentLesson } from "../store/slices/player";
import { useCallback, useEffect } from "react";
import { useCurrentLesson, useStore } from "../zustand-store";

export function Player() {
  // const dispatch = useAppDispatch();

  // const modules = useAppSelector((state) => state.player.course?.modules);

  // const { currentLesson } = useCurrentLesson();

  // useEffect(() => {
  //   dispatch(loadCourse());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (!currentLesson) return;
  //   document.title = `Assistindo ${currentLesson.title}`;
  // }, [currentLesson]);

  const course = useStore((store) => store.course);
  const load = useStore((store) => store.load);

  const { currentLesson } = useCurrentLesson();

  const getCourse = useCallback(async () => {
    await load();
  }, [load]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  useEffect(() => {
    if (!currentLesson) return;
    document.title = `Assistindo ${currentLesson.title}`;
  }, [currentLesson]);

  console.log(course);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          {/* * HEADER */}
          <Header />

          <button className="flex transition-colors items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>

          <aside className="divide-y-2 divide-zinc-900 w-80 border-l border-zinc-800 bg-zinc-900 absolute top-0 bottom-0 right-0 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {course?.modules?.map((module, index) => (
              <Module
                key={module.id}
                moduleIndex={index}
                title={module.title}
                amountOfLessons={module.lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  );
}
