# HiView<sub>DDRAM</sub>: Interactive visualization of the DNA Damage Response Assemblies Map
![](/docs/images/DDRAM_1-0_-_2022-11-13_19-31-38.png)

HiView<sub>DDRAM</sub> is an interactive webware for exploration of the DNA Damage Response Assemblies Map (DDRAM).

DDRAM is a data-driven, multi-scale map describing the organisation of 605 individual DDR proteins into 109 named assemblies, and the nested relationship between these assemblies.

The DDR Association Score (DAS) network is the integration of 114 input features of physical interaction, co-dependency, co-abundance, co-expression on a genome-wide scale. Protein assemblies in DDRAM, and the assignment of individual proteins to their respective assemblies, are the result of hierarchical clustering of the DAS network.

### Layout of HiView<sub>DDRAM</sub> has four main components: model and data view, search and control panel.
HiView<sub>DDRAM</sub> displays the hierarchical structure of DDRAM on the left panel in a _model view_ using a circle-packing layout, and the underlying DAS network in the right panel in the _data view_ using a network layout that corresponds to the circle-packing layout.

Below the data view is the _control panel_ where certain protein interactions and properties are under the users control. The control panel also contains the SHapley Additive eXplanations (SHAP) framework and convenience functions (copying protein names, exporting the current network as a vector image).

Proteins can be found through the  _search panel_. The search supports multiple proteins in the same search (space- or comma-separated); found proteins are distinguished by color).

Interactions in the DAS network can be explained using the SHAP scores.

There is an extensive help system in the form of a *guided tour*, *tool tips* and this *documentation*. The data view has a context-sensitive _legend_.

HiView<sub>DDRAM</sub> reads and displays data structures stored in NDEx. A toolkit and documentation exist to make the data structures representing multi-scale maps other than DDRAM and to upload them into NDEx for display in HiView<sub>DDRAM</sub>: [ddramutils](https://github.com/idekerlab/ddramutils).

## SHAP framework to explain protein interaction strength (DAS scores)
A strength of HiView<sub>DDRAM</sub> is the ability to explain any interaction in the DAS network using SHapley Additive eXplanations (SHAP) scores, grouped by class of evidence (physical, co-expression, co-abundance, co-dependency). Click any interaction in the DAS network to see an explanation of the DAS score; it will appear below the controls of the _data view_. The explanation comes in the form of Shapley values [Lundberg, Scott M., and Su-In Lee. "A unified approach to interpreting model predictions." Advances in neural information processing systems 30 (2017)]. These SHAP scores shown indicate the contribution of the respective input feature to the DAS score. SHAP and DAS scores are on the same scale. Only the most important SHAP scores are shown (those that are more than one standard deviation from the mean).

For features embedded with _node2vec_, we also show the subnetwork supporting the interaction [Grover, Aditya, and Jure Leskovec. "node2vec: Scalable feature learning for networks." Proceedings of the 22nd ACM SIGKDD international conference on Knowledge discovery and data mining. 2016.]. Note that you can expand each class to see explanations at a higher granularity.

## Quick start guide for users
Go to http://hiview.ucsd.edu, and click the **EXAMPLES** button to select a pre-computed ontology. Press **START**, and you will be taken to a visualization of that ontology. 

![](https://raw.githubusercontent.com/idekerlab/hiview/master/docs/images/hiview-v15-step1.png)

### Control Panel

To open the Control Panel, double-click on the **"hamburger"** button at the top-left of the screen (i.e., the icon with three horizontal lines). The Control Panel allows the following configurations:

1. Configuring the color of circles in the circle-packing diagram.
1. Configuring node size, label size, and edge thickness in the node-link diagram.
1. Enabling gene set enrichment analysis.


#### Automatic gene set enrichment analysys by Enrichr

When a user selects a subsystem, HiView can automatically perform gene set enrichment analysis using the [Enrichr](http://amp.pharm.mssm.edu/Enrichr/) web service.  By default, this option is turned off.  To enable this option, turn on the **Automatically run gene set analysis with Enricher** function in the Control Panel (_hamburger_ icon left to the search panel). Enrichment results are displayed on a separate bottom panel.

----

## Quick Start for developers

HiView is implemented using [React](https://reactjs.org/)

1. Checkout this repository
1. Clone CyViewer module
1. yarn install
1. yarn link
1. In the frontend directory, run ```yarn link cy-viewer```
1. ```yarn start```

----
&copy; 2017 - 2022 UC, San Diego Trey Ideker Lab

HiView Application is designed and implemented by Keiichiro Ono (kono ucsd edu).  
