"use client";

import { useState } from "react";
import Link from "next/link";
import { Award, X, ExternalLink, CheckCircle2 } from "lucide-react";

export default function StickyCTA() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="sticky-cta cursor-pointer flex items-center gap-2 group"
        aria-label="See Top Pick"
      >
        <Award size={16} className="text-amber-300" />
        <span>See Top Pick →</span>
      </button>

      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative border border-[var(--line)] animate-in fade-in zoom-in-95">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-[var(--ink3)] hover:text-[var(--ink)]"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2">
              <Award size={16} />
              <span>Longevity Reviewed Editor&#39;s Choice 2026</span>
            </div>

            <h3 className="font-serif-brand font-bold text-2xl text-[var(--ink)] mb-3">
              The Essential Longevity Protocol
            </h3>

            <p className="text-sm text-[var(--ink2)] leading-relaxed mb-4">
              Based on extensive clinical trial aggregation, our medical reporting team identified the highest-confidence, evidence-backed longevity interventions:
            </p>

            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-2 text-xs text-[var(--ink)]">
                <CheckCircle2 size={16} className="text-emerald-600 flex-none mt-0.5" />
                <span><strong>Zone 2 Cardiovascular Base:</strong> 150–180 minutes weekly for mitochondrial density.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-[var(--ink)]">
                <CheckCircle2 size={16} className="text-emerald-600 flex-none mt-0.5" />
                <span><strong>Skeletal Muscle Preservation:</strong> Progressive resistance training for metabolic sink.</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-[var(--ink)]">
                <CheckCircle2 size={16} className="text-emerald-600 flex-none mt-0.5" />
                <span><strong>Nocturnal Architecture:</strong> 7.5+ hours uninterrupted for glymphatic cerebral clearance.</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href="/article/the-gym-supplement-in-your-cabinet-might-also-help-your-immune-system-fight-cancer"
                onClick={() => setModalOpen(false)}
                className="flex-1 bg-[var(--accent)] text-white text-center py-2.5 px-4 rounded-lg font-bold text-sm hover:bg-[var(--accent2)] transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Read Full Review</span>
                <ExternalLink size={14} />
              </Link>
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2.5 border border-[var(--line)] text-xs font-semibold rounded-lg text-[var(--ink2)] hover:bg-[#F6F5F1]"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
