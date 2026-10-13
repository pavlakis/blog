<template>
  <article class="cv" itemscope itemtype="https://schema.org/Person">
    <!-- Extended professional profile -->
    <div class="sr-only" role="complementary" aria-label="Professional Profile Summary">
      <h2>Professional Profile</h2>
      <dl>
        <template v-for="entry in profileSummary" :key="entry.label">
          <dt>{{ entry.label }}</dt>
          <dd>{{ entry.text }}</dd>
        </template>
      </dl>
    </div>

    <header class="cv-header text-center mb-5">
      <h1 class="display-4 mb-3" itemprop="name">
        <span itemprop="givenName">Antonios</span> <span itemprop="familyName">Pavlakis</span> <span itemprop="honorificSuffix">MSc MBCS</span>
      </h1>
      <p class="lead text-muted" itemprop="jobTitle">Development Manager | Critical EHS & Lone Worker Systems | PHP Backend & Security | Scalable Architecture | Team Lead</p>
    </header>

    <div class="cv-content">
      <!-- Contact -->
      <section class="contact-section mb-5" aria-label="Contact Information">
        <div class="contact-info d-flex justify-content-center flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/pavlakis" target="_blank" rel="noopener noreferrer" class="contact-link" itemprop="sameAs" aria-label="LinkedIn Profile">
            <i class="bi bi-linkedin" aria-hidden="true"></i> linkedin.com/in/pavlakis
          </a>
          <a href="https://pavlakis.dev" target="_blank" rel="noopener noreferrer" class="contact-link" itemprop="url" aria-label="Personal Website">
            <i class="bi bi-globe" aria-hidden="true"></i> pavlakis.dev
          </a>
        </div>
      </section>

      <!-- Professional Experience -->
      <section class="cv-section mb-5" aria-labelledby="experience-heading">
        <h2 class="section-title" id="experience-heading">
          <i class="bi bi-briefcase-fill me-2" aria-hidden="true"></i>
          Professional Experience
        </h2>

        <!-- Current Role Card -->
        <div class="experience-grid mb-4">
          <!-- EcoOnline Global - Current Development Manager -->
          <article class="experience-card current-role" itemprop="worksFor" itemscope itemtype="https://schema.org/Organization">
            <div class="card-header-custom">
              <div class="title-badges">
                <h3 class="position-title" itemprop="jobTitle">{{ currentRole.title }}</h3>
                <span class="remote-badge" aria-label="Remote Position">🏠 Remote</span>
              </div>
              <time class="date-badge current" :datetime="currentRole.startDate">{{ currentRole.period }}</time>
            </div>
            <p class="company-location">
              <span class="company-name" itemprop="name">{{ currentRole.company }}</span>
              <span class="location" itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                <span itemprop="addressLocality">{{ currentRole.locality }}</span>, <span itemprop="addressCountry">{{ currentRole.country }}</span>
              </span>
            </p>
            <div class="description">
              <p>{{ currentRole.description }}</p>
            </div>
          </article>

          <!-- EcoOnline Global / StaySafe - Career Progression -->
          <article class="experience-card progression-card">
            <div class="card-header-custom">
              <div class="title-badges">
                <h3 class="position-title">Career Progression</h3>
              </div>
            </div>
            <p class="company-location">
              <span class="company-name">{{ currentRole.company }}</span>
              <span class="location">{{ currentRole.locality }}, {{ currentRole.country }}</span>
            </p>
            <div class="progression-timeline">
              <div v-for="role in careerProgression" :key="role.startDate" class="timeline-entry">
                <div class="timeline-dot" aria-hidden="true"></div>
                <div class="timeline-content">
                  <span class="timeline-title">{{ role.title }}</span>
                  <span class="timeline-company">
                    {{ role.company }} <span v-if="role.note" class="timeline-note">{{ role.note }}</span>
                  </span>
                  <span class="timeline-date">
                    <time :datetime="role.startDate">{{ role.period.split(' – ')[0] }}</time> –
                    <time :datetime="role.endDate">{{ role.period.split(' – ')[1] }}</time>
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <!-- Past Positions Card with Toggle -->
        <div class="past-positions-card">
          <button
            class="toggle-button"
            @click="showPastPositions = !showPastPositions"
            type="button"
            :aria-expanded="showPastPositions"
            aria-controls="past-positions-table"
          >
            <span class="toggle-chevron" aria-hidden="true">{{ showPastPositions ? '▴' : '▾' }}</span>
            Past Positions
            <span class="position-count">({{ pastPositions.length }} positions)</span>
          </button>

          <transition name="slide-fade">
            <div v-show="showPastPositions" class="table-card" id="past-positions-table">
              <div class="table-responsive">
                <table class="table experience-table" role="table" aria-label="Previous Employment History">
                  <thead>
                    <tr>
                      <th scope="col">Position</th>
                      <th scope="col">Company</th>
                      <th scope="col">Location</th>
                      <th scope="col">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="position in pastPositions" :key="`${position.company}-${position.period}`">
                      <td><strong>{{ position.title }}</strong></td>
                      <td>{{ position.company }}</td>
                      <td>{{ position.location }}</td>
                      <td>{{ position.period }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </transition>
        </div>
      </section>


      <!-- Community -->
      <section class="cv-section mb-5" aria-labelledby="community-heading">
        <h2 class="section-title" id="community-heading">
          <i class="bi bi-people-fill me-2" aria-hidden="true"></i>
          Community
        </h2>

        <div class="experience-grid">
          <article v-for="role in communityRoles" :key="role.company" class="experience-card community-card">
            <div class="card-header-custom">
              <h3 class="position-title">{{ role.title }}</h3>
              <time class="date-badge current" :datetime="role.startDate">{{ role.period }}</time>
            </div>
            <p class="company-location">
              <span class="company-name">
                <a v-if="role.url" :href="role.url" target="_blank" rel="noopener noreferrer" class="company-link">
                  {{ role.company }}
                </a>
                <template v-else>{{ role.company }}</template>
              </span>
            </p>
            <div v-if="role.description" class="description">
              <p>{{ role.description }}</p>
            </div>
          </article>
        </div>
      </section>

      <!-- Education -->
      <section class="cv-section mb-5" aria-labelledby="education-heading">
        <h2 class="section-title" id="education-heading">
          <i class="bi bi-mortarboard-fill me-2" aria-hidden="true"></i>
          Education
        </h2>

        <div class="education-grid">
          <article v-for="degree in education" :key="degree.title" class="education-card" itemprop="alumniOf" itemscope itemtype="https://schema.org/EducationalOrganization">
            <div class="education-header">
              <h3 class="degree-title" itemprop="hasCredential" itemscope itemtype="https://schema.org/EducationalOccupationalCredential">
                <span itemprop="name">{{ degree.title }}</span>
              </h3>
              <span class="education-date">
                <time :datetime="degree.startDate">{{ degree.startDate }}</time> -
                <time :datetime="degree.endDate">{{ degree.endDate }}</time>
              </span>
            </div>
            <p class="institution" itemprop="name">{{ degree.institution }}</p>
          </article>
        </div>
      </section>
    </div>

    <div class="mt-5 text-center no-print">
      <RouterLink to="/blog" class="btn btn-outline-primary">
        <i class="bi bi-journal-text"></i> Read the Blog
      </RouterLink>
      <button class="btn btn-primary ms-2" @click="printCV">
        <i class="bi bi-printer-fill"></i> Print CV
      </button>
    </div>
  </article>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useSEO } from '@/composables/useSEO'
import { useStructuredData } from '@/composables/useStructuredData'
import {
  currentRole,
  careerProgression,
  pastPositions,
  communityRoles,
  education,
  profileSummary,
  cvMeta,
  cvStructuredData
} from '@/data/cv'

const showPastPositions = ref(false)
const printCV = () => window.print()

useSEO(cvMeta)
useStructuredData(cvStructuredData)
</script>

<style scoped>
/* Extended profile for assistive technology */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* Base Styles */
.cv {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.cv-header {
  padding-bottom: 2rem;
  border-bottom: 3px solid #e9ecef;
  margin-bottom: 3rem;
}

.cv-header h1 {
  font-weight: 700;
  color: #212529;
}

.cv-header .lead {
  font-size: 1.25rem;
  color: #6c757d;
}

/* Contact Section */
.contact-section {
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 2rem;
}

.contact-info {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
}

.contact-link {
  color: #495057;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #0d6efd;
  transform: translateY(-2px);
}

.contact-link i {
  font-size: 1.2rem;
}

/* Section Styles */
.cv-section {
  margin-top: 3rem;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #212529;
  margin-bottom: 2rem;
  padding-bottom: 0.75rem;
  border-bottom: 3px solid #0d6efd;
  display: flex;
  align-items: center;
}

.section-title i {
  color: #0d6efd;
}

/* Experience Grid */
.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 1.5rem;
}

.company-note-inline {
  font-size: 0.85rem;
  color: #6c757d;
  font-style: italic;
  font-weight: 400;
}

/* Progression Card */
.progression-card {
  border: 1px solid #dee2e6;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.progression-card::before {
  background: linear-gradient(to bottom, #0d6efd, #6610f2);
  opacity: 1;
  width: 4px;
}

/* Progression Timeline */
.progression-timeline {
  margin-top: 0.75rem;
  padding-left: 0.25rem;
  position: relative;
}

.progression-timeline::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 10px;
  bottom: 10px;
  width: 2px;
  background: linear-gradient(to bottom, #0d6efd, #6610f2);
  opacity: 0.3;
}

.timeline-entry {
  display: flex;
  align-items: flex-start;
  gap: 0.875rem;
  padding: 0.5rem 0;
  position: relative;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #0d6efd;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 2px #0d6efd;
  flex-shrink: 0;
  margin-top: 3px;
  position: relative;
  z-index: 1;
}

.timeline-entry:first-child .timeline-dot {
  background: #6610f2;
  box-shadow: 0 0 0 2px #6610f2;
}

.timeline-content {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
  flex: 1;
}

.timeline-title {
  font-size: 0.95rem;
  font-weight: 600;
  color: #212529;
  line-height: 1.3;
}

.timeline-company {
  font-size: 0.85rem;
  color: #495057;
}

.timeline-note {
  font-size: 0.78rem;
  color: #6c757d;
  font-style: italic;
}

.timeline-date {
  font-size: 0.8rem;
  color: #6c757d;
  font-weight: 500;
}

/* Past Positions Card & Toggle */
.past-positions-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  margin-top: 1.5rem;
}

.toggle-button {
  width: 100%;
  padding: 1.25rem 1.5rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: none;
  border-bottom: 1px solid #e9ecef;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #212529;
  transition: all 0.3s ease;
  text-align: left;
}

.toggle-button:hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.toggle-chevron {
  font-size: 1.25rem;
  color: #0d6efd;
  transition: transform 0.3s ease;
}

.position-count {
  margin-left: auto;
  font-size: 0.9rem;
  font-weight: 500;
  color: #6c757d;
}

.table-card {
  padding: 0;
}

/* Slide Fade Transition */
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* Experience Table */
.experience-table {
  margin: 0;
  border-collapse: separate;
  border-spacing: 0;
  background: white;
  border-radius: 0;
  overflow: hidden;
  box-shadow: none;
}

.experience-table thead {
  background: linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%);
  color: white;
}

.experience-table thead th {
  padding: 1rem;
  font-weight: 600;
  text-align: left;
  border: none;
  font-size: 0.95rem;
  letter-spacing: 0.025em;
}

.experience-table tbody tr {
  border-bottom: 1px solid #e9ecef;
  transition: background-color 0.2s ease;
}

.experience-table tbody tr:last-child {
  border-bottom: none;
}

.experience-table tbody tr:hover {
  background-color: #f8f9fa;
}

.experience-table tbody td {
  padding: 1rem;
  vertical-align: top;
  font-size: 0.9rem;
}

.experience-table tbody td:first-child {
  min-width: 220px;
}

.experience-table tbody td:nth-child(2) {
  min-width: 200px;
}

.experience-table tbody td:nth-child(3) {
  min-width: 140px;
}

.experience-table tbody td:nth-child(4) {
  min-width: 160px;
  white-space: nowrap;
}

.remote-badge-small {
  display: inline-block;
  padding: 0.125rem 0.375rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 4px;
  font-size: 0.65rem;
  font-weight: 600;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.table-note {
  display: block;
  font-size: 0.8rem;
  color: #6c757d;
  font-style: italic;
  margin-top: 0.25rem;
}

.table-responsive {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.experience-card {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 12px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(to bottom, #0d6efd, #0a58ca);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.experience-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
  border-color: #0d6efd;
}

.experience-card:hover::before {
  opacity: 1;
}

.current-role {
  border: 2px solid #0d6efd;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
}

.current-role::before {
  opacity: 1;
  width: 5px;
}

.community-card::before {
  background: linear-gradient(to bottom, #198754, #146c43);
}

.community-card:hover {
  border-color: #198754;
}

.community-card:hover::before {
  opacity: 1;
}

.card-header-custom {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.title-badges {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  flex: 1;
  min-width: 200px;
}

.position-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #212529;
  margin: 0;
}

.remote-badge {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
  letter-spacing: 0.025em;
}

.date-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  color: #495057;
  white-space: nowrap;
}

.date-badge.current {
  background: #d1e7dd;
  border-color: #198754;
  color: #146c43;
  font-weight: 600;
}

.date-badge.current::after {
  content: ' 🟢';
  font-size: 0.7rem;
}

.company-location {
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.company-name {
  font-size: 1rem;
  font-weight: 600;
  color: #495057;
}

.company-link {
  color: #495057;
  text-decoration: none;
  transition: color 0.3s ease;
}

.company-link:hover {
  color: #0d6efd;
  text-decoration: underline;
}

.company-note {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  padding: 0.25rem 0;
}

.location {
  font-size: 0.875rem;
  color: #6c757d;
  font-style: italic;
  display: block;
}

.location::before {
  content: '📍';
  margin-right: 0.375rem;
}

.description {
  min-height: 1.5rem;
  padding-top: 0.5rem;
  color: #495057;
  line-height: 1.6;
  font-size: 0.95rem;
}

/* Education Grid */
.education-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 400px), 1fr));
  gap: 1.5rem;
}

.education-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.education-card::before {
  content: '🎓';
  position: absolute;
  font-size: 8rem;
  opacity: 0.1;
  right: -1rem;
  bottom: -2rem;
}

.education-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.education-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.75rem;
  gap: 1rem;
  flex-wrap: wrap;
}

.degree-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  flex: 1;
  min-width: 200px;
}

.education-date {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  backdrop-filter: blur(10px);
}

.institution {
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
  opacity: 0.95;
}

/* Print Styles */
@media print {
  .cv {
    max-width: 100%;
  }

  .no-print,
  button,
  .btn {
    display: none !important;
  }

  .toggle-button {
    display: none !important;
  }

  .table-card {
    display: block !important;
  }

  .past-positions-card {
    box-shadow: none;
    border: 1px solid #000;
  }

  .section-title {
    color: #000;
    border-bottom-color: #000;
  }

  .experience-card,
  .education-card {
    break-inside: avoid;
    box-shadow: none;
    border: 1px solid #000;
    page-break-inside: avoid;
  }

  .experience-table {
    box-shadow: none;
    border: 1px solid #000;
  }

  .experience-table thead {
    background: #000 !important;
    color: #fff !important;
  }

  .experience-table tbody tr {
    page-break-inside: avoid;
  }

  .table-responsive {
    overflow: visible;
  }

  .experience-table tbody td:nth-child(n) {
    min-width: 0;
    white-space: normal;
  }

  .education-card {
    background: #fff;
    color: #000;
  }

  .education-card::before {
    display: none;
  }

  .experience-card::before {
    display: none;
  }

  .experience-card:hover,
  .education-card:hover {
    transform: none;
  }
}

/* Responsive Styles */
@media (max-width: 768px) {
  .cv {
    padding: 1rem 0.5rem;
  }

  .cv-header h1 {
    font-size: 2rem;
  }

  .cv-header .lead {
    font-size: 1rem;
  }

  .contact-info {
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

  .experience-grid,
  .education-grid {
    grid-template-columns: 1fr;
  }

  .card-header-custom {
    flex-direction: column;
    align-items: flex-start;
  }

  .date-badge {
    align-self: flex-start;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .position-title,
  .degree-title {
    font-size: 1.1rem;
  }

  .experience-table {
    font-size: 0.85rem;
  }

  .experience-table thead th,
  .experience-table tbody td {
    padding: 0.75rem 0.5rem;
  }
}

@media (max-width: 480px) {
  .cv-header h1 {
    font-size: 1.75rem;
  }

  .section-title {
    font-size: 1.25rem;
  }

  .experience-card,
  .education-card {
    padding: 1.25rem;
  }
}
</style>

