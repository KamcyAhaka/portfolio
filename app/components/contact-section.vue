<script setup lang="ts">
const contactMethods = [
  {
    icon: "octicon:mail-16",
    title: "Email",
    value: "kamcyahaka@gmail.com",
    href: "mailto:kamcyahaka@gmail.com",
  },
  {
    icon: "simple-icons:linkedin",
    title: "LinkedIn",
    value: "Divine (KamCy) Ahaka",
    href: "https://www.linkedin.com/in/divine-ahaka/",
  },
  {
    icon: "octicon:device-mobile-16",
    title: "Mobile",
    value: "+234 706 461 3220",
    href: "https://wa.me/2347064613220",
  },
  {
    icon: "qlementine-icons:resume-16",
    title: "Resume",
    value: "Download",
    href: "/divine-ahaka-resume.pdf",
  },
];
</script>

<template>
  <section id="contact" class="flex flex-col items-start gap-12 pt-16 pb-16 md:pb-32 lg:gap-20 lg:pt-32 xl:flex-row">
    <div class="contact-header flex flex-col gap-5 lg:sticky lg:top-32 lg:w-1/2">
      <h2
        class="font-accent text-3xl leading-[1.1] font-extrabold tracking-[0.12rem] capitalize md:text-5xl lg:text-[4rem]"
      >
        <span class="block text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.6)]">Let's</span> Connect
      </h2>
      <p
        class="contact-intro max-w-[52ch] text-sm leading-[1.8] text-[rgba(216,216,216,0.6)] md:text-base lg:max-w-none lg:text-lg"
      >
        Whether you have a question, a project in mind, or just want to connect, feel free to reach out. I'll do my best
        to get back to you!
      </p>
    </div>

    <div class="contact-grid grid w-full grid-cols-2 gap-4 md:gap-6 xl:w-1/2">
      <a
        v-for="method in contactMethods"
        :key="method.title"
        :href="method.href"
        :target="method.href.startsWith('http') ? '_blank' : undefined"
        :download="method.title === 'Resume' ? 'divine-ahaka-resume.pdf' : undefined"
        class="contact-card group flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
      >
        <div
          class="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-xl text-white/50 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white md:h-12 md:w-12 md:text-2xl"
        >
          <Icon :name="method.icon" />
        </div>
        <div class="flex flex-col gap-1">
          <h3 class="font-accent text-sm font-semibold text-white/90 md:text-base">{{ method.title }}</h3>
          <p class="text-xs text-[#afaeae] transition-colors duration-300 group-hover:text-white/80 md:text-sm">
            {{ method.value }}
          </p>
        </div>
      </a>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contact-title {
  font-family: var(--font-accent, inherit);
  font-size: clamp(1.75rem, 6vw, 2.5rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: 0.12rem;
  text-transform: capitalize;

  &--outline {
    display: block;
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.6);
  }
}

.contact-intro {
  line-height: 1.8;
  color: rgba(216, 216, 216, 0.6);
}
</style>
