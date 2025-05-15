import { useEffect, useRef } from "react";

export default function InstagramReel() {
    const containerRef = useRef(null);

    useEffect(() => {
        const loadInstagramEmbed = () => {
            if (window.instgrm) {
                window.instgrm.Embeds.process();
            }
        };

        // Check if the script is already loaded before appending it
        if (!window.instgrm) {
            const script = document.createElement("script");
            script.src = "https://www.instagram.com/embed.js";
            script.async = true;
            script.onload = loadInstagramEmbed;
            script.onerror = () => {
                console.error("Failed to load Instagram embed script.");
            };
            document.body.appendChild(script);
        } else {
            loadInstagramEmbed();
        }
    }, []);  // Empty dependency array ensures this runs only once

    const reels = [
        "https://www.instagram.com/reel/DEurZIvyXoa",
        "https://www.instagram.com/reel/Cj1X3rVOHni",
        "https://www.instagram.com/reel/CkaMUzSpMgH",
    ];

    return (
        <>
            <h1 className="head-title">Follow us on Instagram</h1>
            <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8 mx-8">
                {reels.map((url, index) => (
                    <blockquote
                        key={index}
                        className="instagram-media"
                        data-instgrm-permalink={`${url}/?utm_source=ig_embed&utm_campaign=loading`}
                        data-instgrm-version="14"
                        style={{
                            background: "#FFF",
                            border: 0,
                            borderRadius: "3px",
                            boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                            margin: "10px",
                            maxWidth: "100%",
                            minWidth: "56px",
                            width: "calc(100% - 6px)",
                        }}
                    ></blockquote>
                ))}
            </div>
        </>
    );
}
