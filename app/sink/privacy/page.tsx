"use client"

import React from "react"
import { siteConfig } from "@/config/site"
import { Navbar } from "@/components/navbar"
import { Badge } from "@/components/ui/badge"

export default function SinkPrivacyPage() {
  return (
    <>
      <Navbar navbarData={siteConfig.pages.sink} accentColors={["#0A6F69", "#075a58"]} />
      <main className="container mx-auto px-4 sm:px-6 max-w-3xl py-16 relative z-10">
        <div className="space-y-8">
          <div className="space-y-3">
            <Badge className="bg-[#0A6F69]/10 text-[#0A6F69] dark:text-[#14b8ad] border-[#0A6F69]/30 dark:border-[#14b8ad]/30">
              Sink
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Sink is designed with transparency and user control as core principles. We operate a
              strictly tiered telemetry model that separates mandatory system diagnostics from
              optional usage analytics and account links.
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold">1. The Three Tiers</h2>
            <div className="overflow-x-auto rounded-xl border border-border/60">
              <table className="w-full text-sm">
                <thead className="bg-muted/30 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="p-3 text-left">Tier</th>
                    <th className="p-3 text-left">Name</th>
                    <th className="p-3 text-left">Control</th>
                    <th className="p-3 text-left">Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/40">
                  <tr>
                    <td className="p-3 font-medium">Tier 1</td>
                    <td className="p-3">Diagnostics</td>
                    <td className="p-3">Always on</td>
                    <td className="p-3">
                      App load times, hardware profile, stability, crash reports
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Tier 2</td>
                    <td className="p-3">Usage Statistics</td>
                    <td className="p-3">First-run choice &amp; Settings toggle</td>
                    <td className="p-3">
                      Aggregated session summaries, listening minutes, audio output, headphone model
                      allow-list
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium">Tier 3</td>
                    <td className="p-3">Spotify Account Link</td>
                    <td className="p-3">Separate opt-in toggle in Settings</td>
                    <td className="p-3">
                      Attaches Spotify User ID to usage data for the dashboard
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">2. Tier 1: Diagnostics (Mandatory)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              To ensure stability and debug performance regressions across platforms, Sink collects
              a minimal set of anonymous system diagnostics:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 pl-2">
              <li>
                <strong>App Startup &amp; Load Timing</strong>: duration from process launch to UI
                interactive (<code>startup_ms</code>) and DOM ready timing.
              </li>
              <li>
                <strong>Hardware &amp; Platform Profile</strong> (sent once on first launch): OS
                name and version, CPU architecture, CPU core-count bucket, display scale factor, app
                version.
              </li>
              <li>
                <strong>Stability &amp; Crashes</strong>: coarse error categories, scrubbed panic
                reports and runtime exceptions (usernames, file paths and URLs stripped), offline
                crash preservation delivered on next boot.
              </li>
              <li>
                <strong>Identity</strong>: an ephemeral, randomized <code>diag_id</code>, never
                linked to your Spotify account or Tier 2 usage statistics.
              </li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">3. Tier 2: Usage Statistics (User Choice)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sink prompts you during first-run setup with an equal-visibility choice. Nothing is
              sent in Tier 2 until you make your choice. When enabled, Sink collects coarse session
              summaries (aggregated once per session):
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 pl-2">
              <li>
                <strong>Listening Duration &amp; Counts</strong>: total listening minutes per
                session, tracks played, tracks skipped, shuffle and repeat toggles used.
              </li>
              <li>
                <strong>Navigation Flow</strong>: ordered list of visited route names (e.g.
                <code>&quot;home,search,album&quot;</code>), capped at 50 per session. Never
                includes item IDs, album IDs, or playlist IDs.
              </li>
              <li>
                <strong>Audio Setup &amp; Hardware</strong>: output device type, sample rate,
                bitrate, and DSP state.
              </li>
              <li>
                <strong>Headphone Allow-List Matching</strong>: matches your system device name
                against an on-device allow-list of known models; if not matched, reports{" "}
                <code>&quot;other&quot;</code>. Your actual device name is never transmitted.
              </li>
              <li>
                <strong>Identity</strong>: a randomized <code>usage_id</code>, separate from{" "}
                <code>diag_id</code>.
              </li>
            </ul>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Toggling off Tier 2 in Settings → Privacy immediately purges in-memory usage queues,
              discards the <code>usage_id</code>, disconnects any Tier 3 account links, and ensures
              zero Tier 2 requests leave your computer.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">4. Tier 3: Spotify Account Link (Opt-In)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Available only when Tier 2 is active, disabled by default. Lets you link your Spotify
              User ID (and optional display name) with your anonymous <code>usage_id</code> so we
              can display your aggregated stats in our web dashboard. Disconnecting or toggling Tier
              2 off sends an instant <code>/v1/forget</code> request to remove the mapping from our
              servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">5. What We Never Collect (Any Tier)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sink will never collect, transmit, or store:
            </p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 pl-2">
              <li>Spotify access tokens, refresh tokens, or passwords</li>
              <li>Track titles, artist names, album titles, or playlist names</li>
              <li>Granular playback history (exact timestamps of individual songs)</li>
              <li>Search queries</li>
              <li>Raw audio output device names</li>
              <li>IP addresses (stripped by our edge privacy proxy)</li>
              <li>Personal file paths or computer hostnames</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-semibold">
              6. Architecture, Retention &amp; &quot;Delete My Data&quot;
            </h2>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1.5 pl-2">
              <li>
                <strong>Edge Privacy Proxy</strong>: all telemetry routes through our dedicated
                Cloudflare Worker (<code>telemetry.sink-app.workers.dev</code>), which enforces
                strict schema allow-lists, drops client IP headers, applies rate limits, and caps
                daily ingest.
              </li>
              <li>
                <strong>Data Residency</strong>: European Union (EU) data centers, fully compliant
                with GDPR regulations.
              </li>
              <li>
                <strong>Retention Period</strong>: raw telemetry data is retained for a maximum of
                12 months before automated deletion.
              </li>
              <li>
                <strong>&quot;Delete My Data&quot;</strong>: you can click &quot;Delete My
                Data&quot; in Settings → Privacy at any time. Sink immediately sends a{" "}
                <code>/v1/delete-all</code> request to our servers to delete your usage and account
                link records.
              </li>
              <li>
                <strong>&quot;View What&apos;s Sent&quot; Live Log</strong>: inspect every outbound
                telemetry event in real time directly inside Settings → Privacy → &quot;View
                What&apos;s Sent&quot;.
              </li>
            </ul>
          </section>

          <div className="pt-6 border-t border-border/40 text-xs text-muted-foreground">
            <p>
              Sink is an independent, third-party desktop application developed by xbl4z3r. Not
              affiliated with, maintained, authorized, sponsored, or endorsed by Spotify AB.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
