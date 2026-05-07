<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue'
import CertificateCard from './components/CertificateCard.vue'
import MediaModal from './components/MediaModal.vue'
import ProjectCard from './components/ProjectCard.vue'
import SectionTitle from './components/SectionTitle.vue'
import {
  awardGroups,
  certificates,
  education,
  footerMeta,
  navigation,
  profile,
  projects,
  skillGroups,
} from './data/siteData'

const activeSection = ref('hero')
const modalState = reactive({
  open: false,
  title: '',
  subtitle: '',
  items: [],
  index: 0,
})

let sectionObserver

const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(
  '简历网站联系｜田彦涛',
)}`

const programmingLanguages =
  skillGroups.find((group) => group.title === '编程语言')?.items ?? []

const resumeFacts = [
  { label: '电话', value: profile.phone, href: `tel:${profile.phone}` },
  { label: '邮箱', value: profile.email, href: `mailto:${profile.email}` },
  { label: '所在地', value: profile.city },
  { label: '出生年月', value: profile.birthday },
  { label: '民族', value: profile.ethnicity },
  { label: '英语水平', value: profile.english },
]

const scrollToSection = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const openGallery = ({ title, subtitle, items, index = 0 }) => {
  modalState.open = true
  modalState.title = title
  modalState.subtitle = subtitle
  modalState.items = items
  modalState.index = index
}

const closeGallery = () => {
  modalState.open = false
}

const showNext = () => {
  modalState.index = (modalState.index + 1) % modalState.items.length
}

const showPrev = () => {
  modalState.index =
    (modalState.index - 1 + modalState.items.length) % modalState.items.length
}

const previewCertificate = (certificate) => {
  if (certificate.thumbnail) {
    openGallery({
      title: certificate.title,
      subtitle: certificate.category,
      items: [
        {
          src: certificate.thumbnail,
          alt: certificate.title,
          title: certificate.title,
          description: certificate.note,
        },
      ],
      index: 0,
    })
    return
  }

  window.open(certificate.sourceUrl, '_blank', 'noopener,noreferrer')
}

onMounted(() => {
  const sections = navigation
    .map((item) => document.getElementById(item.id))
    .filter(Boolean)

  sectionObserver = new IntersectionObserver(
    (entries) => {
      const visibleEntries = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

      if (visibleEntries[0]?.target?.id) {
        activeSection.value = visibleEntries[0].target.id
      }
    },
    {
      threshold: [0.2, 0.4, 0.65],
      rootMargin: '-15% 0px -40% 0px',
    },
  )

  sections.forEach((section) => sectionObserver.observe(section))
})

onBeforeUnmount(() => {
  sectionObserver?.disconnect()
})
</script>

<template>
  <div class="page-shell">
    <div class="page-glow page-glow--one" />
    <div class="page-glow page-glow--two" />

    <header class="topbar">
      <div class="topbar__brand">
        <span class="topbar__brand-mark">TYT</span>
        <div>
          <strong>{{ profile.name }}</strong>
          <small>{{ profile.title }}</small>
        </div>
      </div>

      <nav class="topbar__nav">
        <button
          v-for="item in navigation"
          :key="item.id"
          type="button"
          :class="{ 'is-active': activeSection === item.id }"
          @click="scrollToSection(item.id)"
        >
          {{ item.label }}
        </button>
      </nav>

      <a class="topbar__resume" :href="profile.resume" target="_blank" rel="noreferrer">
        下载简历
      </a>
    </header>

    <main class="page-content">
      <section id="hero" class="hero" v-reveal>
        <div class="hero__copy">
          <p class="hero__eyebrow">Software Engineering / Backend Track</p>
          <h1>{{ profile.name }}</h1>
          <h2>{{ profile.title }}</h2>
          <p class="hero__intro">
            {{ profile.intro }}
          </p>

          <div class="hero__chips">
            <span>{{ profile.city }}</span>
            <span>{{ profile.english }}</span>
            <span>{{ profile.politicalStatus }}</span>
          </div>

          <div class="hero__actions">
            <a :href="profile.github" target="_blank" rel="noreferrer">GitHub</a>
            <a :href="profile.resume" target="_blank" rel="noreferrer">PDF 简历</a>
            <a :href="mailtoLink">邮箱联系</a>
          </div>

          <div class="hero__highlights">
            <article v-for="item in profile.highlights" :key="item" class="hero-highlight">
              {{ item }}
            </article>
          </div>
        </div>

        <div class="hero__side">
          <article class="hero-card hero-card--photo">
            <img :src="profile.avatar" :alt="profile.name" loading="lazy" />
          </article>

          <article class="hero-card hero-card--facts">
            <div class="hero-card__head">
              <div>
                <p class="hero-card__eyebrow">Resume Snapshot</p>
                <h3>个人信息区</h3>
                <p class="hero-card__subtitle">
                  {{ profile.title }} · {{ education.school }}
                </p>
              </div>

              <span class="hero-card__badge">{{ education.degree }}</span>
            </div>

            <dl class="hero-card__meta-grid">
              <div
                v-for="fact in resumeFacts"
                :key="fact.label"
                class="hero-card__meta-item"
              >
                <dt>{{ fact.label }}</dt>
                <dd>
                  <a v-if="fact.href" :href="fact.href">
                    {{ fact.value }}
                  </a>
                  <strong v-else>{{ fact.value }}</strong>
                </dd>
              </div>
            </dl>

            <div class="hero-card__section">
              <p class="hero-card__section-label">编程语言</p>
              <div class="hero-card__tags">
                <span v-for="language in programmingLanguages" :key="language">
                  {{ language }}
                </span>
              </div>
            </div>

            <div class="hero-card__links">
              <a :href="profile.resume" target="_blank" rel="noreferrer">下载 PDF 简历</a>
              <a :href="profile.github" target="_blank" rel="noreferrer">GitHub 主页</a>
              <a :href="profile.cet4Proof" target="_blank" rel="noreferrer">
                CET-4 成绩单
              </a>
            </div>
          </article>
        </div>
      </section>

      <section id="education" class="section-block" v-reveal>
        <SectionTitle
          title="教育背景"
          subtitle="核心课程、方向定位与公开主页"
        />

        <article class="education-card">
          <div class="education-card__head">
            <div>
              <h3>{{ education.school }}</h3>
              <p>{{ education.major }}｜{{ education.degree }}</p>
            </div>
            <span>{{ education.period }}</span>
          </div>

          <p class="education-card__summary">{{ education.summary }}</p>

          <div class="education-card__courses">
            <span v-for="course in education.courses" :key="course">{{ course }}</span>
          </div>

          <a
            class="education-card__link"
            :href="profile.github"
            target="_blank"
            rel="noreferrer"
          >
            GitHub 主页：TYT-tong-dev
          </a>
        </article>
      </section>

      <section id="skills" class="section-block" v-reveal>
        <SectionTitle
          title="专业技能"
          subtitle="按语言、后端基础、数据处理与协作工具组织"
        />

        <div class="skills-grid">
          <article v-for="group in skillGroups" :key="group.title" class="skill-card">
            <h3>{{ group.title }}</h3>
            <p>{{ group.summary }}</p>
            <div class="skill-card__tags">
              <span v-for="item in group.items" :key="item">{{ item }}</span>
            </div>
          </article>
        </div>
      </section>

      <section id="projects" class="section-block" v-reveal>
        <SectionTitle
          title="项目经历"
          subtitle="展示后端方向、可视化项目实践和代表图片"
        />

        <div class="projects-grid">
          <ProjectCard
            v-for="project in projects"
            :key="project.id"
            :project="project"
            @open-gallery="openGallery"
          />
        </div>
      </section>

      <section id="awards" class="section-block" v-reveal>
        <SectionTitle
          title="荣誉获奖与证书"
          subtitle="竞赛、综合经历与可预览的证书材料"
        />

        <div class="awards-layout">
          <div class="awards-groups">
            <article v-for="group in awardGroups" :key="group.title" class="award-group">
              <h3>{{ group.title }}</h3>
              <ul>
                <li v-for="item in group.items" :key="item">{{ item }}</li>
              </ul>
            </article>
          </div>

          <div class="certificates-grid">
            <CertificateCard
              v-for="certificate in certificates"
              :key="certificate.title"
              :certificate="certificate"
              @preview="previewCertificate"
            />
          </div>
        </div>
      </section>

      <section id="contact" class="section-block" v-reveal>
        <SectionTitle
          title="联系方式"
          subtitle="欢迎联系我交流项目、简历或后端相关实习机会"
        />

        <div class="contact-panel">
          <div class="contact-panel__copy">
            <h3>正在寻找后端开发相关实习岗位</h3>
            <p>{{ footerMeta.statement }}</p>
          </div>

          <div class="contact-panel__list">
            <a :href="`tel:${profile.phone}`">{{ profile.phone }}</a>
            <a :href="mailtoLink">{{ profile.email }}</a>
            <a :href="profile.github" target="_blank" rel="noreferrer">
              {{ profile.github }}
            </a>
            <a :href="profile.resume" target="_blank" rel="noreferrer">下载 PDF 简历</a>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <span>{{ profile.name }} · {{ profile.title }}</span>
      <span>Built locally with Vue 3 + Vite</span>
    </footer>

    <MediaModal
      :open="modalState.open"
      :title="modalState.title"
      :subtitle="modalState.subtitle"
      :items="modalState.items"
      :active-index="modalState.index"
      @close="closeGallery"
      @next="showNext"
      @prev="showPrev"
      @select="(index) => (modalState.index = index)"
    />
  </div>
</template>
