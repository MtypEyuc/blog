import React, { useState } from 'react';
import { useCurrentSidebarCategory } from '@docusaurus/theme-common';

export default function FileList() {
    const category = useCurrentSidebarCategory();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const folderName = category?.label

    return (
        <div>
            <div style={{ display: "grid", gap: "10px" }}>
                {category?.items?.map((item, index) => {
                    const chpNumber = (index + 1).toString().padStart(2, '0');
                    const chpId = `chp${chpNumber}`;
                    const permalink = `/docs-learn/online_course/${folderName}/${chpId}`;

                    const isHovered = hoveredIndex === index;

                    return (
                        <div
                            key={chpId}
                            onClick={() => window.location.href = permalink}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            style={{
                                border: "1px solid #ddd",
                                padding: "15px",
                                borderRadius: "8px",
                                boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
                                backgroundColor: isHovered ? "#f0f8ff" : "#fff",
                                cursor: "pointer",
                                transition: "all 0.3s ease",
                            }}>
                            <a
                                href={permalink}
                                style={{
                                    textDecoration: "none",
                                    fontWeight: "bold",
                                    color: "#007bff"
                                }}>
                                {item.label}
                            </a>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
