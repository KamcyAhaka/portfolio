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
  <section id="contact" class="flex flex-col gap-12 pt-16 pb-32">
    <div class="contact-header flex flex-col gap-5">
      <h2 class="contact-title">
        Let's
        <span class="contact-title--outline">Connect</span>
      </h2>
      <p class="contact-intro text-sm">
        Whether you have a question, a project in mind, or just want to connect, feel free to reach out. I'll do my best
        to get back to you!
      </p>
    </div>

    <div class="contact-grid grid grid-cols-2 gap-6 md:grid-cols-3">
      <a
        v-for="method in contactMethods"
        :key="method.title"
        :href="method.href"
        :target="method.href.startsWith('http') ? '_blank' : undefined"
        :download="method.title === 'Resume' ? 'divine-ahaka-resume.pdf' : undefined"
        class="contact-card group flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-3 transition-all duration-300 hover:border-white/15 hover:bg-white/[0.05]"
      >
        <div
          class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-2xl text-white/50 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
        >
          <Icon :name="method.icon" />
        </div>
        <div class="flex flex-col gap-1">
          <h3 class="font-accent text-base font-semibold text-white/90">{{ method.title }}</h3>
          <p class="text-xs text-[#afaeae] transition-colors duration-300 group-hover:text-white/80">
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
  max-width: 52ch;
}
</style>
