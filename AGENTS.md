<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

<!-- PROJECT:BEGIN -->
> [!IMPORTANT]
> In the product gallery, each shot may declare its own aspect ratio
> (`Shot.ratio`) and the frame animates to it. Images that do not match the
> default ratio must be shown complete this way — never cropped by
> `object-cover` and never letterboxed with `object-contain` over a solid
> backdrop, because both clip content or leave a visible seam.
>
> In drag-scrollable thumbnail strips, never call `setPointerCapture` on
> pointer-down: it retargets the following click to the strip, so the thumbnail
> buttons never fire. Start the capture only once the pointer has actually moved
> past a small threshold, so a plain press-and-release still selects.
<!-- PROJECT:END -->

- Mobile product gallery navigation uses a native scroll-snap track with a next-slide preview; calculate selection from slide offsets so spacing cannot desynchronize the active image.
