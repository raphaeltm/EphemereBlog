---
title: Fixing FuseTools Build Problems on Windows
---

I've been playing with [FuseTools](https://www.fusetools.com/). It seems like a really interesting platform.

As I understand it, they offer a templating language (called UX, I think) which compiles to C++ and to build an interface in OpenGL. Business logic is all written in JavaScript. While this sounds a bit like React Native or NativeScript, the difference is that those use JavaScript to build the native interface, while FuseTools creates a stricter separation between business and presentation logic.

I had only used the desktop preview to see how all of this works, but really wanted to try building one of the example projects to run on my LG G5 running Android Nougat. But it refused to work!

The first thing to keep in mind is that Google has been transitioning the Android build process away from [Ant](http://ant.apache.org/) to [Gradle](https://gradle.org/). Unfortunately, the default for FuseTools is Ant, which isn't available if you recently (late March 2017) installed [Android Studio](https://developer.android.com/studio/index.html). The solution? When you run `fuse build --target=Android` include the `-DGRADLE` flag: 

`fuse build --target=Android -DGRADLE`

If you already tried to build without the `-DGRADLE` flag, you'll also need to run `uno clean` to get rid of some problematic cached files.

So, I thought that once I had fixed that up, it would be all good. But I use Windows machines for the most part... Some might call this blasphemy, but I generally prefer Windows, and its interface. But it certainly has some... quirks. Like a 260 character limit for file paths. Which was hinted at in this error:

```
CMake Warning in CMakeLists.txt:
  The object file directory

    C:/FuseTools/onboarding-with-pagecontrol/build/Android/Debug/onboarding-with-pagecontrol/app/.externalNativeBuild/cmake/debug/armeabi-v7a/CMakeFiles/onboardingwithpagecontrol.dir/

  has 179 characters.  The maximum full path to an object file is 250
  characters (see CMAKE_OBJECT_PATH_MAX).  Object file

    onboarding-with-pagecontrol/app/src/main/jni/_root.onboardingwithpagecontrol_bundle.cpp.o

  cannot be safely placed under this directory.  The build may not work
  correctly.
```

I was wondering if I should just cave and use my Mac for this stuff, but decided to check and see if Windows 10 had finally added a workaround for this issue. Especially since it's a pretty common problem to have when building NodeJS projects (which often have crazy, deeply, deeply, nested structures in node_modules).

Turns out it is possible to turn this limit off. Why it's not off by default? I cannot possibly fathom. Oh Microsoft. [Here is the article](https://www.howtogeek.com/266621/how-to-make-windows-10-accept-file-paths-over-260-characters/) I found that explains how to do it. I use Windows 10 Pro, so it was just a couple seconds in the Group Policy Editor to flip the switch.

Finally, I ran `uno clean` just to be safe, and `fuse build --target=Android -DGRADLE --run`. I finally had the example running properly on my phone! It's beautifully smooth, and I can't wait to start building my own stuff with FuseTools.

{% include image.html url="fusetools.png" caption="I did eventually get it to build and run on my LG G5" %}