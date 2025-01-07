# Social Media Performance Analysis

---

### **Overview**

This project analyzes social media performance using:

- **Langflow** for workflow creation and GPT integration.
- **DataStax Astra DB** for database operations.

The key tasks include:

1. **Database Upload**
2. **Post Analysis**
3. **Video Analysis**

---

### **Task Breakdown**

#### **1. Database Upload**

- **Flow Description**:
  1. A predefined JSON dataset simulating social media engagement (e.g., likes, shares, comments, post types) is prepared.
  2. The dataset is chunked into 512-character segments with 50-character overlaps.
  3. These chunks are uploaded to Astra DB along with OpenAI embeddings.

#### **2. Post Analysis**

![Post_analysis](https://github.com/user-attachments/assets/e2821bb1-a711-40b2-8563-28bd034a7351)
- **Workflow**:

  1. A chat input queries Astra DB using search parameters.
  2. OpenAI embeddings refine the query and parse relevant data.
  3. Insights are generated through Langflow’s GPT integration, providing detailed performance metrics.

- **Example Outputs**:

  - Carousel posts have 20% higher engagement than static posts.
  - Reels drive 2x more comments compared to other formats.

#### **3. Video Analysis**
![Video_Analysis](https://github.com/user-attachments/assets/5ad2258e-0571-4e05-948e-066515c68127)

- **Transcript Analysis**:
  1. Video scripts or transcripts are extracted using Whisper AI.
  2. The transcript is processed in Langflow, where GPT evaluates strengths, weaknesses, and suggestions.

- **Thumbnail Analysis**:

  1. A thumbnail image is uploaded and analyzed using the Sharp package.
  2. Key metrics include:
     - **Brightness**: 75.84%
     - **Contrast**: 65.26%
     - **Color Variety**: 25.84%
     - **Visual Complexity**: 15.53%
     - **Topic Relevance**: 20%
  3. **Suggestions**:
     - Good contrast.
     - Consider using more diverse colors and visual elements.
     - Use YouTube’s recommended 16:9 aspect ratio.
